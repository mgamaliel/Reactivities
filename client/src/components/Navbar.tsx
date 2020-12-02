import React, { FC } from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import logoUrl from '../../assets/logo.png'
import './Navbar.css'

const Navbar: FC = (): JSX.Element => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header>
                    <img src={logoUrl} alt="Logo" style={{ marginRight: '10px' }} /> Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive>Create Activity</Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default Navbar
