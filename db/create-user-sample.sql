CREATE USER 'healthdiary' @'localhost' IDENTIFIED BY '';

GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthdiary' @'localhost';

FLUSH PRIVILEGES;
