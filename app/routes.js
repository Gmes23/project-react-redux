// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

// import { requireAuth } from 'containers/Viewer/lib';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
          // import('containers/Search/sagas'),
          // import('containers/Search'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    
    
   {
      path: '/login',
      name: 'login',
    getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignIn'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    
    
    {
      path: '/sign-up',
      name: 'sign-up',
    getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignUp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    
    
    
    
    
    
    
    {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },


      // for example's sake, require authentication to see /features
        // onEnter: requireAuth,
     },
     
    //  {
    //    path: '/login',
    //    name: 'login',
    //   getComponent(nextState, cb) {
    //      System.import('containers/Login')
    //        .then(loadModule(cb))
    //        .catch(errorLoading);
    //    },
    //  },
     
     
     
      // {
      //  path: '/login/callback',
      //  name: 'loginCallback',
      //  getComponent(nextState, cb) {
      //    const importModules = Promise.all([
      //    System.import('containers/LoginCallback/sagas'),
      //      System.import('containers/LoginCallback'),
      //    ]);
 
      //   const renderRoute = loadModule(cb);
 
      //    importModules.then(([sagas, component]) => {
      //      injectSagas(sagas.default);
      //     renderRoute(component);
      //   });
 
      //    importModules.catch(errorLoading);
      //  },


















  ];
}
