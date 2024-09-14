import { Request, Response } from 'express';
import Task from '../models/Task';

// Create Task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, status, mail, type } = req.body;

    const newTask = new Task({ text, status, mail, type });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Read Tasks (Get by mail)
export const getTasksByMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mail } = req.params;

    // Fetch tasks by mail
    const tasks = await Task.find({ mail }); // Get only the note field

    if (tasks.length === 0) {
      res.status(404).json({ message: 'No tasks found for this email.' });
      return;
    }

    // Return the notes
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update Task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { text, status }, { new: true });

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
