CREATE TABLE "groupMessage" (
  "id" BIGSERIAL PRIMARY KEY,
  "groupId" VARCHAR NOT NULL,
  "content" Text NOT NULL,
  "fileUrl" Text,
  "memberId" VARCHAR NOT NULL,
  "memberImage" VARCHAR NOT NULL,
  "channelId" VARCHAR NOT NULL,
  "deleted" Boolean DEFAULT false,
  "deletedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz DEFAULT now()
);

CREATE TABLE "group" (
  "id" BIGSERIAL PRIMARY KEY,
  "groupId" VARCHAR NOT NULL,
  "userId" VARCHAR NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);
