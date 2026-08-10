CREATE TABLE admin_user (
    id            BIGSERIAL PRIMARY KEY,
    username      VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE project (
    id             BIGSERIAL PRIMARY KEY,
    title          VARCHAR(150) NOT NULL,
    description    TEXT NOT NULL,
    date_range     VARCHAR(100),
    image_url      VARCHAR(500),
    project_url    VARCHAR(500),
    display_order  INTEGER NOT NULL DEFAULT 0,
    created_at     TIMESTAMP NOT NULL DEFAULT now(),
    updated_at     TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE project_tag (
    project_id BIGINT NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    tag        VARCHAR(50) NOT NULL
);
CREATE INDEX idx_project_tag_project_id ON project_tag(project_id);

CREATE TABLE blog_post (
    id             BIGSERIAL PRIMARY KEY,
    title          VARCHAR(200) NOT NULL,
    slug           VARCHAR(200) NOT NULL UNIQUE,
    short_content  TEXT NOT NULL,
    full_content   TEXT NOT NULL,
    published_at   TIMESTAMP NOT NULL DEFAULT now(),
    created_at     TIMESTAMP NOT NULL DEFAULT now(),
    updated_at     TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE skill (
    id             BIGSERIAL PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    icon_key       VARCHAR(100) NOT NULL,
    display_order  INTEGER NOT NULL DEFAULT 0,
    created_at     TIMESTAMP NOT NULL DEFAULT now(),
    updated_at     TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE contact_message (
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(150) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    message    VARCHAR(500) NOT NULL,
    is_read    BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
