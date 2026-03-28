# Clear Incident Data Script
# This script clears all incident reports from the database

Write-Host "=== Clearing Incident Data ===" -ForegroundColor Yellow
Write-Host "This will remove all emergency reports, internal reports, and related data." -ForegroundColor Yellow
Write-Host ""

# Check if Supabase CLI is available
try {
    $supabaseVersion = & supabase --version 2>$null
    Write-Host "Found Supabase CLI: $supabaseVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Supabase CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "Install with: npm install -g supabase" -ForegroundColor Red
    exit 1
}

# Confirm before proceeding
$confirmation = Read-Host "Are you sure you want to clear ALL incident data? (yes/no)"
if ($confirmation -ne "yes") {
    Write-Host "Operation cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host "Clearing incident data..." -ForegroundColor Yellow

# Execute SQL script
try {
    & supabase db push --db-url scripts/clear-incident-data.sql
    Write-Host "✅ Incident data cleared successfully!" -ForegroundColor Green
    Write-Host "The heatmap should now show zero incidents." -ForegroundColor Green
} catch {
    Write-Host "❌ Error clearing incident data: $_" -ForegroundColor Red
    Write-Host "You may need to run the SQL manually in your Supabase dashboard." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual SQL to run in Supabase dashboard:" -ForegroundColor Yellow
    Get-Content "scripts/clear-incident-data.sql" | Write-Host
}

Write-Host ""
Write-Host "=== Operation Complete ===" -ForegroundColor Yellow
