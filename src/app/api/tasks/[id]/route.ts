import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { TaskSchema } from '@/lib/validations';

//@ts-ignore
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } =  params;

    const body = await req.json();
    const validation = TaskSchema.partial().safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.errors },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      validation.data,
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error updating task',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } =  params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error deleting task',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
