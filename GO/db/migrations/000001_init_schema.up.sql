CREATE TABLE "message" (
  "id" bigserial PRIMARY KEY,
  "content" Text NOT NULL,
  "fileUrl" Text,
  "memberId" bigserial NOT NULL,
  "channelId" bigserial NOT NULL,
  "deleted" Boolean DEFAULT false,
  "deletedAt" timestamptz,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

CREATE TABLE "conversation" (
  "id" bigserial PRIMARY KEY,
  "memberIdOne" bigserial NOT NULL,
  "memberNameOne" Text NOT NULL,
  "memberIdTwo" bigserial NOT NULL,
  "memberNameTwo" Text NOT NULL,
  "createdAt" timestamptz DEFAULT now()
);

CREATE TABLE "conversationMessage" (
  "id" bigserial PRIMARY KEY,
  "conversationId" bigint NOT NULL,
  "content" Text NOT NULL,
  "fileUrl" Text,
  "deleted" Boolean DEFAULT false,
  "deletedAt" timestamptz,
  "createdAt" timestamptz DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now(),
  CONSTRAINT fk_conversation FOREIGN KEY ("conversationId") REFERENCES "conversation" ("id")
);

CREATE INDEX ON "message" ("memberId");
CREATE INDEX ON "message" ("channelId");
CREATE UNIQUE INDEX ON "conversation" ("memberIdOne", "memberIdTwo");
