CREATE TABLE "message" (
  "id" bigserial PRIMARY KEY,
  "content" Text NOT NULL,
  "fileUrl" Text,
  "memberId" VARCHAR NOT NULL,
  "channelId" VARCHAR NOT NULL,
  "deleted" Boolean DEFAULT false,
  "deletedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

CREATE TABLE "conversation" (
  "id" bigserial PRIMARY KEY, 
  "memberIdOne" VARCHAR NOT NULL,
  "memberNameOne" VARCHAR NOT NULL,
  "memberIdTwo" VARCHAR NOT NULL,
  "memberNameTwo" VARCHAR NOT NULL,
  "memberImageOne" VARCHAR NOT NULL,
  "memberImageTwo" VARCHAR NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "conversationMessage" (
  "id" bigserial PRIMARY KEY,
  "conversationId" bigserial NOT NULL,
  "content" Text NOT NULL,
  "fileUrl" Text,
  "deleted" Boolean DEFAULT false,
  "deletedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now(),
  CONSTRAINT fk_conversation FOREIGN KEY ("conversationId") REFERENCES "conversation" ("id")
);

CREATE INDEX ON "message" ("memberId");
CREATE INDEX ON "message" ("channelId");
CREATE UNIQUE INDEX ON "conversation" ("memberIdOne", "memberIdTwo");
