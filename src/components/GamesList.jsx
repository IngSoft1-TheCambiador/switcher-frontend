import GameRow from './GameRow';
import '../index.css';

function GamesList(games)
{
  return (
    <div class="bg-slate-200">
      <div class="my-[5vh]">
        <div class="flex flex-col">
          <div class="mx-6 my-4 flex flex-row gap-[5vh] text-4xl font-semibold tracking-wide text-slate-900">
            <div class="h-[12vh] w-[60vh] bg-slate-500">
              <div class="mx-4 my-3 text-left">Partida</div>
            </div>
            <div class="size-[12vh] bg-slate-500">
              <div class="my-3 text-center">Min</div>
            </div>
            <div class="size-[12vh] bg-slate-500">
              <div class="my-3 text-center">Max</div>
            </div>
          </div>
        </div>
        
        { games.map( (game) => GameRow(game) ) }

        <div class="flex flex-row justify-center gap-[5vh] text-4xl">
          <div class="size-[12vh] bg-slate-300 text-center">
            <div class="my-4">
             ⬅️
            </div>
          </div>
          <div class="size-[12vh] bg-slate-300 text-center">
            <div class="my-4">
             ➡️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
