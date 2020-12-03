import React, { FC } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../types'

type Props = {
    selected: Activity | null

    onEdit?(): void
    onCancel?(): void
}

const ActivityDetails: FC<Props> = (props: Props): JSX.Element => {
    return (
        <Card fluid>
            <Image src={`../assets/category/${props.selected?.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.selected?.title ?? 'Title'}</Card.Header>
                <Card.Meta>
                    <span>{props.selected?.date}</span>
                </Card.Meta>
                <Card.Description>{props.selected?.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color="blue" onClick={props.onEdit}>
                        Edit
                    </Button>
                    <Button basic color="grey" onClick={props.onCancel}>
                        Cancel
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails
