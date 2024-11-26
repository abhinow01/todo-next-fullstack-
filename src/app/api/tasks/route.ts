// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { TaskSchema } from '@/lib/validations';

// Create a new task
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    const validation = TaskSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        errors: validation.error.errors 
      }, { status: 400 });
    }

    const task = await Task.create(validation.data);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error creating task', 
      error: error instanceof Error ? error.message : error 
    }, { status: 500 });
  }
}

// Get all tasks
export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error fetching tasks', 
      error: error instanceof Error ? error.message : error 
    }, { status: 500 });
  }
}