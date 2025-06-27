import { Request, Response , Router } from 'express';
import prisma from '../db/prisma-client'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        title: 'asc', // Order by the title in ascending order
      },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err });
  } finally {
    await prisma.$disconnect();
  }
});


router.post('/',async (req:Request,res:Response)=>{
  const { title } = req.body
  try{
    const task= await prisma.task.create({
      data: {
        title:title
      }
    })
    res.status(200).json(task);
  }catch(err){
    res.status(400).json({'message':err})
  }finally{
    prisma.$disconnect();
  }
});

router.put('/:id',async (req:Request,res:Response)=>{
  const { title,completed } = req.body
  const { id } = req.params
  try{
    const updatedTask = await prisma.task.update({
      where: {
        id : Number(id)
      },
      data: {
        title: title,
        completed:completed
      },
    })
    res.status(200).json(updatedTask);
  }catch(err){
    res.status(400).json({'message':err})
  }finally{
    prisma.$disconnect();
  }
});

router.delete('/:id',async (req:Request,res:Response)=>{
  const { id } = req.params
  try{
    const deleteTask = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    })
    res.status(200).json(deleteTask);
  }catch(err){
    res.status(400).json({'message':err})
  }finally{
    prisma.$disconnect();
  }
})

export default router;