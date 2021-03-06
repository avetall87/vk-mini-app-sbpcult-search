import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import Search from '@vkontakte/vkui/dist/components/Search/Search';

import './Home.css';

import logo from '../img/32_32.png';
import priznanie from '../img/narodnoe-priznanie-logotip_150.png';
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";


const Home = ({id, go, fetchedUser}) => {

    const [getHumanName, setHumanName] = useState('');
    const SUPPORT_PROJECT_URL = "http://2020.prof-it.d-russia.ru/kyltyra-peterbyrga";

    useEffect(() => {
        reset();
    }, []);

    const supportProject = async () => {
        window.open(SUPPORT_PROJECT_URL);
    }

    const openSearchWindow = (searchToken) => {
        let today = new Date().toISOString().slice(0, 10);
        window.open(`https://spbcult.ru/events/-/explore/all?f=${today}&q=${searchToken}`);
    }

    const search = async () => {
        openSearchWindow(getHumanName);
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            openSearchWindow(getHumanName);
        }
    }

    const reset = () => {
        setHumanName('');
    }

    const onLabelChange = (event) => {
        setHumanName(event.target.value);
    };

    return (<Panel id={id}>
            <PanelHeader right={<Button
                                  onClick={go} data-to="widget"
                                  title="Настройки виджета"
                                  before={<Icon28SettingsOutline/>}
                                  mode="tertiary">
                                Настройки виджета
                                </Button>}
            >
                <PanelHeaderContent before={<Avatar size={36} src={logo}/>}>
                    <Div style={{display: "flex", justifyContent: "space-between"}}>
                        <span class="PageHeaderContent">Поиск культурных событий</span>
                    </Div>
                </PanelHeaderContent>
            </PanelHeader>
            <Group>
                <Div style={{paddingTop: 0}}>
                    <h3 align="left" style={{paddingLeft: 16, fontWeight: 500}}>Уверенная навигация в культурном пространстве</h3>
                    <Search
                        placeholder="Поиск по событиям в Санкт-Петербурге"
                        id="cultSearchId" type="text" value={getHumanName} onChange={onLabelChange} onKeyDown={_handleKeyDown}/>
                    <Div>
                        <Button size="l" className="SearchButton"
                                title="Искать на сайте: Культура Петербурга" onClick={search}>
                            Искать
                        </Button>
                    </Div>

                    <br/>
                    <br/>

                    <Div style={{paddingTop: 45, vAlign: 'top', display: "flex", justifyContent: "space-between"}}>
                        <span>Вы можете <a onClick={supportProject} className="Link">поддержать проект</a> в конкурсе «Народное признание».<br/></span>
                        <img src={priznanie} className="PriznanieLogo" onClick={supportProject}/>
                    </Div>

                </Div>
            </Group>
        </Panel>
    )
};

export default Home;
