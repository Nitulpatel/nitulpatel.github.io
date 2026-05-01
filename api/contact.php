<?php
/**
 * contact.php
 * -----------
 * Handles POST /api/contact  — saves submission to submissions.json
 * Deploy this file to your InfinityFree public_html/ (or a subfolder)
 * alongside submissions.json and admin.php
 *
 * InfinityFree limits: no Node.js, no exec(), mail() works with caveats.
 * This file uses zero external deps — pure PHP 7.4+.
 */

// ── CORS (allow your Vite / built frontend to call this) ──────────────────
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');       // tighten to your domain in prod
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Only accept POST ───────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Read JSON body ─────────────────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// ── Validate required fields ───────────────────────────────────────────────
$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'name, email and message are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// ── Sanitize (strip tags, limit length) ───────────────────────────────────
$entry = [
    'name'    => htmlspecialchars(substr($name,    0, 120), ENT_QUOTES, 'UTF-8'),
    'email'   => htmlspecialchars(substr($email,   0, 200), ENT_QUOTES, 'UTF-8'),
    'subject' => htmlspecialchars(substr($subject, 0, 200), ENT_QUOTES, 'UTF-8'),
    'message' => htmlspecialchars(substr($message, 0, 4000), ENT_QUOTES, 'UTF-8'),
    'ip'      => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'date'    => gmdate('c'),   // ISO 8601 UTC — same format as server.ts
];

// ── Persist to submissions.json ────────────────────────────────────────────
$file = __DIR__ . '/submissions.json';

// Read existing data (create file if missing)
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

$data = json_decode(file_get_contents($file), true);
if (!is_array($data)) $data = [];

$data[] = $entry;

// Write atomically: temp file → rename
$tmp = $file . '.tmp';
if (file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not write submissions file']);
    exit;
}
rename($tmp, $file);

// ── Optional: send email notification (InfinityFree mail() works) ─────────
// Uncomment and set YOUR_EMAIL below to receive an email on each submission.
/*
$to      = 'nitulpatel504@gmail.com';
$subj    = '[Portfolio] New message from ' . $entry['name'];
$body    = "Name:    {$entry['name']}\n"
         . "Email:   {$entry['email']}\n"
         . "Subject: {$entry['subject']}\n\n"
         . $entry['message'];
$headers = "From: no-reply@yourdomain.com\r\n"
         . "Reply-To: {$entry['email']}\r\n"
         . "X-Mailer: PHP/" . phpversion();
@mail($to, $subj, $body, $headers);
*/

// ── Respond ────────────────────────────────────────────────────────────────
http_response_code(201);
echo json_encode([
    'message' => 'Submission saved successfully',
    'entry'   => $entry,
]);
