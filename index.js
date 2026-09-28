const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- INICIANDO TESTE DO CRUD PRISMA ---");

  // 1. CADASTRAR (Create) um novo curso
  const novoCurso = await prisma.course.create({
    data: {
      title: "Introdução ao Desenvolvimento Web",
      description: "Aprenda HTML, CSS e JavaScript básico."
    }
  });
  console.log("Curso Criado:", novoCurso);

  // 2. BUSCAR TODOS os cursos (Read - Todos)
  const todosCursos = await prisma.course.findMany({
    include: { modules: true } // Traz os módulos relacionados se houver
  });
  console.log("Lista de Cursos:", todosCursos);

  // 3. BUSCAR UM CURSO ESPECÍFICO pelo ID (Read - Único)
  const cursoEspecifico = await prisma.course.findUnique({
    where: { id: novoCurso.id }
  });
  console.log("Curso Encontrado por ID:", cursoEspecifico);

  // 4. ALTERAR (Update) o curso existente
  const cursoAtualizado = await prisma.course.update({
    where: { id: novoCurso.id },
    data: { description: "Atualizado: HTML, CSS, JS e Fundamentos de UI/UX." }
  });
  console.log("Curso Atualizado:", cursoAtualizado);

  // 5. EXCLUIR (Delete) o curso pelo ID (opcional para teste)
  // const cursoExcluido = await prisma.course.delete({
  //   where: { id: novoCurso.id }
  // });
  // console.log("Curso Excluído com Sucesso:", cursoExcluido);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });