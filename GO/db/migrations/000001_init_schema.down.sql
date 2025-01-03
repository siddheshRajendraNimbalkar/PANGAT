ALTER TABLE "conversationMessage" DROP CONSTRAINT IF EXISTS fk_conversation;

DROP TABLE IF EXISTS "conversationMessage";
DROP TABLE IF EXISTS "message";
DROP TABLE IF EXISTS "conversation";
