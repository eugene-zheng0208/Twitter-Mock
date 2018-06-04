import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer,
} from './../containers'
import { ConnectedRouter } from 'react-router-redux'

const getRoutes = (checkAuth, history) => (
  <ConnectedRouter history={history}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <MainContainer>
      <Switch>
        <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
        <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
        <Route path='/feed' component={checkAuth(FeedContainer)} />
        <Route path='/duckDetail/:duckId' component={checkAuth(DuckDetailsContainer)} />
        <Route path='/logout' component={LogoutContainer} />
        <Route path='/:uid' component={checkAuth(UserContainer)} />
      </Switch>
    </MainContainer>
  </ConnectedRouter>
)

export default getRoutes
