SELECT * 
FROM simple_users u 
CROSS JOIN members m 
ON u.id = m.userId;

SELECT u.id, u.name, u.email, m.role, p.name
FROM members m 
LEFT JOIN users u 
ON u.id = m.userId
CROSS JOIN projects p
ON p.id = m.projectId;

