import React, { useContext, Fragment, useState, useEffect } from 'react';
import { Context } from '../../context';
import { jumpToLevel } from '../../funcs/browsing';

function JumpLevel() {
  // GLOBAL STATE
  const { state, dispatch } = useContext(Context);

  // LOCAL STATE
  const [local, set_local] = useState({
    levelInput: 5,
  });

  // RECALIBRATE LEVEL VALUES
  useEffect(() => {
    // FISH OUT CURRENT LEVEL
    const current = Math.floor(state.data.route[state.current].experience);

    // SET LOCAL STATE
    set_local({
      levelInput: current,
    });
  }, [state.current, state.data]);

  return (
    <Fragment>
      <div id={'header'}>Jump to level</div>
      <div id={'jump'}>
        <div id={'container'}>
          <form
            onSubmit={e => {
              jumpToLevel(local.levelInput, state, dispatch);
              e.preventDefault();
            }}
          >
            <input
              id={'level'}
              type={'number'}
              value={local.levelInput}
              onChange={e => set_local({ levelInput: e.target.value })}
              min={5}
              max={60}
            />
            <input id={'good'} type={'submit'} value={'Jump'} />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default JumpLevel;
