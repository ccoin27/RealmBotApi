export default {
    async fetch(req) {
      const { pathname } = new URL(req.url);
      const parts = pathname.split('/');
  
      // Параметры из URL
      const enemy = parts[1];
      const animation = parts[2]?.replace('.gif', '');  // убираем .gif из имени анимации
  
      if (!enemy || !animation) {
        return new Response("Некорректный запрос", { status: 400 });
      }
  
      try {
        // Создаем путь к файлу
        const filePath = `sprites/enemies/${enemy}/${animation}.gif`;
  
        // Получаем файл из хранилища (предполагается, что файлы загружены в Cloudflare Workers)
        const file = await fetch(`https://example.com/${filePath}`);
  
        // Если файл найден, возвращаем его содержимое
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
  