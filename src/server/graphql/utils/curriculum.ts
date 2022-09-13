import { NexusGenObjects } from '@root/src/shared/generated/nexus-typegen'
import prisma from '@server/prisma'
import { ApolloError } from 'apollo-server-micro'

export async function getClasses(classIdList: number[]): Promise<NexusGenObjects['Class'][]> {
  const unorderedClasses = await prisma.class.findMany({
    where: {
      id: {
        in: [...classIdList],
      },
    },
  })
  const classes = classIdList.reduce((acc, classId) => {
    const foundClass = unorderedClasses.find(classItem => {
      return classItem.id === classId
    })

    if (foundClass) {
      acc.push(foundClass)
    }

    return acc
  }, [])

  return classes
}

export async function getLessons(
  classContent: NexusGenObjects['ClassContentPayload'],
): Promise<NexusGenObjects['Lesson'][]> {
  if (!classContent) throw new ApolloError('CLASS_CONTENT_NOT_EXISTS')

  const sections = classContent.sections as NexusGenObjects['ClassSectionPayload'][]

  if (!sections) throw new ApolloError('CLASS_CONTENT_SECTIONS_NOT_EXIST')

  const lessonIdList = sections.reduce((acc, section) => {
    const lessonIds = section.lessonIdList
    lessonIds.forEach(lessonId => {
      acc.push(lessonId)
    })

    return acc
  }, [])

  const unorderedLessons = await prisma.lesson.findMany({
    where: {
      id: {
        in: [...lessonIdList],
      },
    },
  })
  const lessons = lessonIdList.reduce((acc, lessonId) => {
    const foundLesson = unorderedLessons.find(lessonItem => {
      return lessonItem.id === lessonId
    })

    if (foundLesson) {
      acc.push(foundLesson)
    }

    return acc
  }, [])

  return lessons
}
