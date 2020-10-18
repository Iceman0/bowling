import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {FormLayout, FormLayoutGroup, Input, Snackbar, Icon24Favorite} from '@vkontakte/vkui/';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import bridge from '@vkontakte/vk-bridge';
import {btnSendClick} from './../utils/sendCLick'

const orangeBackground = {
    backgroundImage: 'linear-gradient(135deg, #ffb73d, #ffa000)'
};

const Home = ({ id, go, fetchedUser }) => {

    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [team, setTeam] = useState("");
    const [snackbar, setSnackbar] = useState(null);

    const onChange = (e) => {
        let { value } = e.currentTarget;
        if (((value <= 300 && value >= 0) || value === '')) setCount( (value === '') ? value : parseInt(value) );
    };

    return (<Panel id={id}>
            <PanelHeader>Введите свой результат</PanelHeader>
            {fetchedUser &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <FormLayout className="bowl-Form">
                        <FormLayoutGroup top="Фамилия">
                            <Input type="text" defaultValue="" placeholder="Введите фамилию" onChange={e => setSurname(e.target.value)}/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Имя">
                            <Input type="text" defaultValue="" placeholder="Введите имя" onChange={e => setName(e.target.value)}/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Команда">
                            <Input type="text" defaultValue="" placeholder="Введите название команды" onChange={e => setTeam(e.target.value)}/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Кол-во очков">
                        	<Input type="number" placeholder="Повторите кол-во очков" onChange={onChange} value={count}/>
                        </FormLayoutGroup>
						<Button size="xl"  disabled={(!(count !== "" && name !== '' && surname !== ''))} onClick={() => btnSendClick(name, surname, team, count)}>Отправить</Button>
                    </FormLayout>
                </Div>
            </Group>
        </Panel>
    );
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
