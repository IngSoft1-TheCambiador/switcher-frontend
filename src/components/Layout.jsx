import "./Layout.css";

function Layout ({ players, currentPlayer, board })

{
  console.log("players: ", players);
  
  function makeBlock (index, color)
  {
    if (color == "r") return <div key={index} class="size-[9vh] bg-red-500"></div>;
    if (color == "g") return <div key={index} class="size-[9vh] bg-green-500"></div>;
    if (color == "b") return <div key={index} class="size-[9vh] bg-blue-500"></div>;
    if (color == "y") return <div key={index} class="size-[9vh] bg-yellow-500"></div>;
  }

  function makeShape(index, shape)
  {
    return 
    (
      <div key={index} class="size-[9vh] bg-red-500"> {shape} </div>
    );
  }

  function playerCard (name, color, shapes)
  {
    return
    (
      <div class="grid grid-cols-3 grid-rows-2">
        <div class="size-[9vh] bg-green-500"></div>
        <div class="bg-white-500 size-[9vh] text-2xl tracking-wide mx-2"> {name} </div>
        <div class="bg-white-500 size-[9vh]"></div>
        {Array.from(Array(shapes.length)).map(index => makeShape(shapes[i]))}
      </div>
    );
  }
  
  const playerComponents = players.map(player => playerCard(player.name, player.color, player.shapes));
  const boardComponents = Array.from(Array(board.length)).map(index => makeBlock(index, board[index]));

  return
  (
  
  <div>
  <div>
    <div>
      <div>
        <div>
          <div class="my-4 grid h-full grid-cols-12 grid-rows-1 gap-4 bg-slate-300">
            <div class="size-[9vh] bg-slate-500">LEAVE</div>
          </div>
        </div>
      </div>

      <div class="flex h-full flex-1 bg-slate-100">
        <div class="grid-col-5 grid-row-6 grid h-[60vh] w-[30vh]">{playerComponents}</div>

        <div class="grid grid-cols-1 grid-rows-6">
          <div class="bg-white-500 size-[9vh]"></div>
        </div>

        <div class="grid aspect-square h-[60vh] w-[60vh] grid-cols-6 grid-rows-6 gap-1 bg-slate-100">{boardComponents}</div>

        <div class="grid grid-cols-1 grid-rows-6">
          <div class="bg-white-500 size-[9vh]"></div>
        </div>

        <div class="flex w-[30vh] flex-col bg-slate-200 tracking-normal">
          <div class="mx-2 my-2 size-fit bg-red-300">
            <div class="mx-2">死ね、ポテト</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-yellow-300">
            <div class="mx-2">今日は違います</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-blue-300">
            <div class="mx-2">誰も死ぬことはありません</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-red-300">
            <div class="mx-2">自分自身のために話す</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-green-300">
            <div class="mx-2">やめろ!!!!!!</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-green-300">
            <div class="mx-2">君は死なない、赤</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-red-400">
            <div class="mx-2">Red left the game</div>
          </div>

          <div class="mx-2 my-2 size-fit bg-slate-400">
            <div class="mx-2">つづく</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="grid h-[25vh] w-full grid-cols-6 grid-rows-3 gap-4 bg-slate-300">
        <div class="mx-4 my-4 grid h-[20vh] w-[100vh] grid-cols-10 grid-rows-1 justify-center gap-4 bg-slate-300">
          <div class="size-[9vh] bg-slate-300"></div>

          <div class="size-[9vh] bg-red-500"></div>

          <div class="size-[9vh] bg-red-500"></div>

          <div class="size-[9vh] bg-red-500"></div>

          <div class="size-[9vh] bg-slate-300"></div>

          <div class="size-[9vh] bg-red-600"></div>

          <div class="size-[9vh] bg-red-600"></div>

          <div class="size-[9vh] bg-red-600"></div>

          <div class="size-[9vh] bg-slate-300"></div>

          <div class="size-[9vh] bg-slate-500"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  );

}

export default Layout; 
