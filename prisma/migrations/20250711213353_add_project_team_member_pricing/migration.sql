-- CreateTable
CREATE TABLE "project_team_member_pricing" (
    "id" TEXT NOT NULL,
    "fixedRate" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "project_team_member_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_team_member_pricing_projectId_teamId_userId_key" ON "project_team_member_pricing"("projectId", "teamId", "userId");

-- AddForeignKey
ALTER TABLE "project_team_member_pricing" ADD CONSTRAINT "project_team_member_pricing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_team_member_pricing" ADD CONSTRAINT "project_team_member_pricing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_team_member_pricing" ADD CONSTRAINT "project_team_member_pricing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_team_member_pricing" ADD CONSTRAINT "project_team_member_pricing_projectId_teamId_fkey" FOREIGN KEY ("projectId", "teamId") REFERENCES "project_teams"("projectId", "teamId") ON DELETE CASCADE ON UPDATE CASCADE;
