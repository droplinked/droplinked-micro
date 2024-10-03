import {
  AppAccordion,
  AppAccordionChevron,
  AppAccordionItem,
  AppAccordionPanel,
  AppAccordionTrigger,
  AppShow,
} from '@droplinked-micro/ui';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { createQueryString } from '@droplinked-micro/utils';

export function App() {
  console.log(
    createQueryString(
      {
        utils: false,
        arrayThings: ['asda', 'asdasd', 'asdfafsf'],
      },
      { arrayFormat: 'json' }
    )
  );
  console.log(
    createQueryString(
      {
        utils: false,
        arrayThings: ['asda', 'asdasd', 'asdfafsf'],
      },
      { arrayFormat: 'comma' }
    )
  );
  console.log(
    createQueryString(
      {
        utils: false,
        arrayThings: ['asda', 'asdasd', 'asdfafsf'],
      },
      { arrayFormat: 'repeat' }
    )
  );
  return (
    <div>
      <AppAccordion alwaysOpen={false}>
        <AppAccordionItem itemId="1">
          <AppAccordionTrigger className="p-4 bg-red-900">
            <span>Item 1</span>
            <AppAccordionChevron />
          </AppAccordionTrigger>
          <AppAccordionPanel className="px-4 pb-4 bg-yellow-700">
            <p>item</p>
          </AppAccordionPanel>
        </AppAccordionItem>
        <AppAccordionItem itemId="2">
          <AppAccordionTrigger className="p-4 bg-red-900">
            <span>Item 2</span>
            <AppAccordionChevron />
          </AppAccordionTrigger>
          <AppAccordionPanel className="px-4 pb-4 bg-yellow-700">
            <p>item</p>
          </AppAccordionPanel>
        </AppAccordionItem>
        <AppAccordionItem itemId="3" defaultOpen>
          <AppAccordionTrigger className="p-4 bg-red-900">
            <span>Item 3</span>
            <AppAccordionChevron />
          </AppAccordionTrigger>
          <AppAccordionPanel className="px-4 pb-4 bg-yellow-700">
            <p>item</p>
          </AppAccordionPanel>
        </AppAccordionItem>
      </AppAccordion>
      <AppShow
        show={{
          when: false,
          then: (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Access Granted
            </button>
          ),
          else: {
            when: false,
            then: <span>ture</span>,
            // else: <h1 className="text-lg">flase</h1>,
          },
        }}
      />
      <NxWelcome title="droplinked" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
