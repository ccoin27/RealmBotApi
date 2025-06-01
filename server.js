export default {
    async fetch(req) {
      const { pathname } = new URL(req.url);
      const parts = pathname.split('/');
  
      const enemy = parts[1];
      const animation = parts[2]?.replace('.gif', ''); 
  
      if (!enemy || !animation) {
        return new Response("Некорректный запрос", { status: 400 });
      }
  
      try {
        const filePath = `sprites/enemies/${enemy}/${animation}.gif`;
  
        const githubRawUrl = `https://raw.githubusercontent.com/ccoin27/rpg_api/main/${filePath}`;
  
        const file = await fetch(githubRawUrl);
  
        if (file.ok) {
          const arrayBuffer = await file.arrayBuffer();
          return new Response(arrayBuffer, {
            status: 200,
            headers: { "Content-Type": "image/gif" }
          });
        } else {
          return new Response("Файл не найден", { status: 404 });
        }
      } catch (error) {
        console.error("Ошибка при получении файла:", error);
        return new Response("Ошибка сервера", { status: 500 });
      }
    },
  };
  
