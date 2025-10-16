'use server';

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.employerId) {
            return NextResponse.json({ message: 'Employer ID is required' }, { status: 400 });
        }
        const applications = await prisma.jobApplication.findMany({
            where: {
                companyId: body.employerId
            },
            include: {

            }
        });

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}