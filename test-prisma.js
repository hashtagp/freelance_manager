const { PrismaClient } = require('@prisma/client');

async function testModels() {
    const prisma = new PrismaClient();
    
    try {
        // Test that models exist
        console.log('Testing team model...');
        const teams = await prisma.team.findMany({ take: 1 });
        console.log('✓ team model works');
        
        console.log('Testing teamMember model...');
        const members = await prisma.teamMember.findMany({ take: 1 });
        console.log('✓ teamMember model works');
        
        console.log('All models working correctly!');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testModels();
