<?php
session_start();
if (!isset($_SESSION['gold'])) {
    $_SESSION['gold'] = 0;
}
?>