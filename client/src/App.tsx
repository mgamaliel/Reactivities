import React, { FC } from 'react'
import 'semantic-ui-css/semantic.css'
import { Header, Icon } from 'semantic-ui-react'

const App: FC = (): JSX.Element => (
    <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
    </Header>
)

export default App
