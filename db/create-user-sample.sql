CREATE USER 'healthdiary' @'localhost' IDENTIFIED BY 'salsasalasana';

GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthdiary' @'localhost';

FLUSH PRIVILEGES;