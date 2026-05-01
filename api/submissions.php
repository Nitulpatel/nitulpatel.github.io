<?php
/**
 * submissions.php
 * ---------------
 * GET  /api/submissions?key=ADMIN_KEY          → JSON list of all submissions
 * GET  /api/submissions?key=ADMIN_KEY&export=csv → download as CSV file
 *
 * Set your admin key in the $ADMIN_KEY constant below.
 * Deploy alongside contact.php and submissions.json.
 */

// ── !! CHANGE THIS TO YOUR OWN SECRET KEY !! ──────────────────────────────
define('ADMIN_KEY', 'Q*C6wN6&R)Vw0p1@');

// ── CORS / headers ─────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Content-Type: application/json');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Auth check ─────────────────────────────────────────────────────────────
$providedKey = $_GET['key'] ?? '';
if ($providedKey !== ADMIN_KEY) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// ── Load submissions ────────────────────────────────────────────────────────
$file = __DIR__ . '/submissions.json';
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

$data = json_decode(file_get_contents($file), true);
if (!is_array($data)) $data = [];

// Newest first
$data = array_reverse($data);

// ── CSV export ──────────────────────────────────────────────────────────────
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    $filename = 'submissions_' . date('Y-m-d') . '.csv';
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    $out = fopen('php://output', 'w');
    // BOM for Excel UTF-8 compatibility
    fputs($out, "\xEF\xBB\xBF");
    // Header row
    fputcsv($out, ['Date', 'Name', 'Email', 'Subject', 'Message', 'IP']);
    foreach ($data as $row) {
        fputcsv($out, [
            $row['date']    ?? '',
            $row['name']    ?? '',
            $row['email']   ?? '',
            $row['subject'] ?? '',
            $row['message'] ?? '',
            $row['ip']      ?? '',
        ]);
    }
    fclose($out);
    exit;
}

// ── JSON response ───────────────────────────────────────────────────────────
header('Content-Type: application/json');
http_response_code(200);
echo json_encode([
    'total'       => count($data),
    'submissions' => $data,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
