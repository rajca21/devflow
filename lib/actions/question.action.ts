'use server';
import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '../mongoose';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import Question from '@/database/Question.model';
import Tag from '@/database/Tag.model';
import User from '@/database/User.model';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: 'tags',
        model: Tag,
      })
      .populate({
        path: 'author',
        model: User,
      })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create new Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    // Create new tags or get the ones that already exists
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, 'i') },
        },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: {
            questions: question._id,
          },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // Push tags inside of the new Question
    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });

    // Refetch data on the path
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
