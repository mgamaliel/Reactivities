import React, { FC } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

type Props = Partial<DefaultProps>
type DefaultProps = Readonly<typeof defaultProps>
const defaultProps = {
    content: undefined as string | undefined,
    inverted: true as boolean
}
const Loading: FC<Props> = ({ content, inverted }: Props): JSX.Element => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

Loading.defaultProps = defaultProps

export default Loading
