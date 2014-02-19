CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `gmt_create` datetime NOT NULL COMMENT 'create time',
  `gmt_modified` datetime NOT NULL COMMENT 'modified time',
  `name` varchar(100) NOT NULL COMMENT 'user name',
  `email` varchar(100) NOT NULL COMMENT 'user email',
  `password` varchar(100) NOT NULL COMMENT 'user encrypted password',
  `blog` varchar(256) COMMENT 'user blog',
  `avatar` varchar(256) COMMENT 'user avatar url',
  `location` varchar(100) COMMENT 'user location',
  `company` varchar(100) COMMENT 'user company',
  `followers` bigint(20) unsigned NOT NULL DEFAULT 0 COMMENT 'user followers number',
  `following` bigint(20) unsigned NOT NULL DEFAULT 0 COMMENT 'user following number',
  `block` tinyint unsigned NOT NULL DEFAULT 0 COMMENT 'if the user was blocked',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  KEY `email_password` (`email`, `password`),
  KEY `gmt_modified` (`gmt_modified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='user base info';

