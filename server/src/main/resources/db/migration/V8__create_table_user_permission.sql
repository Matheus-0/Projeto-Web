CREATE TABLE IF NOT EXISTS user_permission (
    user_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, permission_id),
    KEY FK_User_Permission_User (user_id),
    KEY FK_User_Permission_Permission (permission_id),
    CONSTRAINT FK_User_Permission_User FOREIGN KEY (user_id) REFERENCES user (id),
    CONSTRAINT FK_User_Permission_Permission FOREIGN KEY (permission_id) REFERENCES permission (id)
);