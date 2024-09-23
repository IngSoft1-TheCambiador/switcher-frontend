import '../index.css';

function GameRow(game)
{
  return (
    <div class="text-4xl mx-6 my-4 flex flex-row font-semibold tracking-wide gap-[5vh] text-slate-600">
      <div class="w-[60vh] h-[12vh] bg-slate-300">
        <div class="mx-4 my-3 text-left">
          {game.gameName}
        </div>
      </div>
      <div class="size-[12vh] bg-slate-300">
        <div class="my-3 text-center">
          {game.minPlayers}
        </div>
      </div>
      <div class="size-[12vh] bg-slate-300">
        <div class="my-3 text-center">
          {game.maxPlayers}
        </div>
      </div>
    </div>);
}

export default GameRow;
