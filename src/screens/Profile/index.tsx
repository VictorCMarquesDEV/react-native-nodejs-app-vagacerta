import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
    Wrapper,
    Container,
    Header,
    HeaderButtonContainer,
    ButtonIcon,
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input'
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { View } from 'react-native';


export default function Profile({ navigation }) {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleUpdate = async () => {
        try {
            const jsonValue = JSON.stringify({
                "id": id,
                "nome": nome,
                "email": email,
                "senha": senha
            });
            await AsyncStorage.setItem('user', jsonValue);

            await api.put(`/usuarios/${id}`,
                {
                    "id": id,
                    "nome": nome,
                    "email": email,
                    "senha": senha
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                let user = JSON.parse(jsonValue);

                const response = await api.get(`/usuarios/${user.id}`);
                user = response.data;

                setId(user.id);
                setNome(user.nome);
                setEmail(user.email);
                setSenha(user.senha);

            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    <Input label='Nome' placeholder='digite seu nome' value={nome} onChangeText={setNome} />
                    <Input label='E-mail' placeholder='digite seu e-mail' value={email} onChangeText={setEmail} />
                    <Input label='Senha' placeholder='digite sua senha' value={senha} onChangeText={setSenha} />
                </ContentContainer>

                <Button
                    title="Salvar informações"
                    noSpacing={true}
                    variant='primary'
                    onPress={handleUpdate}
                />
            </Container>
            <Container>
                <View style={{ flex: 1 }}></View>
                <Button
                    title="Logout"
                    noSpacing={true}
                    variant='primary'
                    onPress={() => { }}
                />
            </Container>
        </Wrapper>
    );
}
