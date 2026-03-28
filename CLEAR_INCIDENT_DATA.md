# Instructions to Clear Incident Data

## Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste the following SQL script:

```sql
-- Clear incident reports from database
-- This script removes all emergency reports and internal reports
-- to reset the heatmap to zero incidents

-- Clear emergency_reports table
DELETE FROM emergency_reports;

-- Clear internal_reports table  
DELETE FROM internal_reports;

-- Clear admin notifications related to incidents
DELETE FROM admin_notifications WHERE emergency_report_id IS NOT NULL;

-- Clear user notifications related to incidents  
DELETE FROM user_notifications WHERE emergency_report_id IS NOT NULL;

-- Clear any draft reports
DELETE FROM er_team_drafts;

COMMIT;

-- Output confirmation
DO $$
BEGIN
    RAISE NOTICE 'Database cleared: All incident reports have been removed.';
    RAISE NOTICE 'Tables cleared: emergency_reports, internal_reports, admin_notifications, user_notifications, er_team_drafts';
END $$;
```

4. Click "Run" to execute the script
5. Verify the heatmap shows zero incidents

## Method 2: Using Supabase CLI (if available)

If you have Supabase CLI installed:

```bash
cd c:\Users\jlcha\mdrrmo-app
supabase db reset
```

Then run the migrations again to set up the clean schema.

## Verification

After clearing the data:
1. Go to the Admin Dashboard
2. Navigate to "Incident Heat Map" 
3. The heatmap should show:
   - "No incidents found for selected filters."
   - Zero incident points
   - Empty barangay totals list

## Notes

- This operation is **irreversible** - all incident data will be permanently deleted
- Make sure you have backups if you need any historical data
- The heatmap will remain centered on Magallanes, Sorsogon as configured
- New incident reports will start accumulating from zero once users submit reports
