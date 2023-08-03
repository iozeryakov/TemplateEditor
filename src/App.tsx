import { useContext } from 'react';
import { TemplateEditor } from './components/TemplateEditor/TemplateEditor';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { save } from './utils/utils';
import useLastFocus from './hooks/useLastFocus';


function App() {
  const { modals } = useContext(Context)
  const isOpen = modals.getIsOpen("modal1")
  const { setLastFocus } = useLastFocus(isOpen)
  return (
    <>
      <button className='btn' type='button' onClick={(e) => { setLastFocus(e.currentTarget); modals.open("modal1"); }}>Message Editor</button>
      {isOpen &&
        <TemplateEditor
          callbackSave={save}
          arrVarNames={localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['firstname', 'lastname', 'company', 'position']}
          template={localStorage.template ? JSON.parse(localStorage.template) : null} />}
    </>
  );
}

export default observer(App);

