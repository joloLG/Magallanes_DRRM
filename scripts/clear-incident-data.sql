-- Clear incident reports from database
-- This script removes all emergency reports and internal reports
-- to reset the heatmap to zero incidents

-- Clear emergency_reports table
DELETE FROM emergency_reports;

-- Clear internal_reports table  
DELETE FROM internal_reports;

-- Reset any sequences if they exist
-- (For PostgreSQL databases)
-- ALTER SEQUENCE IF EXISTS emergency_reports_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS internal_reports_id_seq RESTART WITH 1;

-- Clear admin notifications related to incidents
DELETE FROM admin_notifications WHERE emergency_report_id IS NOT NULL;

-- Clear user notifications related to incidents  
DELETE FROM user_notifications WHERE emergency_report_id IS NOT NULL;

-- Clear any draft reports
DELETE FROM er_team_drafts;

-- Clear any related audit logs or tracking tables if they exist
-- (Add additional table清理 as needed)

COMMIT;

-- Output confirmation
DO $$
BEGIN
    RAISE NOTICE 'Database cleared: All incident reports have been removed.';
    RAISE NOTICE 'Tables cleared: emergency_reports, internal_reports, admin_notifications, user_notifications, er_team_drafts';
END $$;
