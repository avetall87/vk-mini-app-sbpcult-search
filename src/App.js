import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Widget from "./panels/widget/Widget";

const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [vkGroupId, setVkGroupId] = useState(-1);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
            console.log();
        });

        async function fetchVkGroupId() {
            let fetchData = window.location.href.split('&').filter(value => value.includes("vk_group_id")).map(value => value.split('=')[1]);
            setVkGroupId(fetchData[0]);
        }

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
            return null;
        }

        fetchData();
        fetchVkGroupId();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <View activePanel={activePanel} popout={popout}>
            <Home id='home' fetchedUser={fetchedUser} go={go}/>
            <Widget id='widget' go={go} vkGroupId={vkGroupId}/>
        </View>
    );
}

export default App;
