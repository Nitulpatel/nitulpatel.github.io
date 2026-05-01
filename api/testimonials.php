<?php
/**
 * testimonials.php
 * ----------------
 * GET /api/testimonials.php → JSON list of public testimonials (submissions)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$file = __DIR__ . '/submissions.json';
if (!file_exists($file)) {
    echo json_encode([]);
    exit;
}

$data = json_decode(file_get_contents($file), true);
if (!is_array($data)) {
    $data = [];
}

// Return reverse (newest first)
// Optionally remove sensitive fields like email/ip here:
$publicData = array_map(function($entry) {
    return [
        'name' => $entry['name'] ?? 'Anonymous',
        'message' => $entry['message'] ?? '',
        'date' => $entry['date'] ?? '',
    ];
}, $data);

echo json_encode(array_reverse($publicData), JSON_UNESCAPED_UNICODE);
