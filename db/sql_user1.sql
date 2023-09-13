
CREATE USER 'dblab.user01'@'192.168.0.0/255.255.255.0' IDENTIFIED BY 'maria105sql';
GRANT INSERT,UPDATE,DELETE ON dblab.* TO 'dblab.user01'@'192.168.0.0/255.255.255.0';
GRANT SELECT ON dblab.* TO 'dblab.user01'@'192.168.0.0/255.255.255.0';

CREATE USER 'dblab.user02'@'192.168.0.0/255.255.255.0' IDENTIFIED BY 'maria105sql';
GRANT SELECT ON dblab.* TO 'dblab.user02'@'192.168.0.0/255.255.255.0';
GRANT INSERT ON dblab.* TO 'dblab.user02'@'192.168.0.0/255.255.255.0';
