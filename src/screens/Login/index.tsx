import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import api from '../../services/api';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.get('/usuarios');
            const users = response.data;
            const user = users.find(i => i.email == email && i.senha == senha);
            if (user) {
                // Salvar o usuário localmente
                const jsonValue = JSON.stringify(user);
                await AsyncStorage.setItem('user', jsonValue);

                navigation.navigate('Auth', { screen: 'Home' });
            } else {
                console.log('Usuário não encontrado!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    <Input label='E-mail' placeholder='Digite o seu e-mail' value={email} onChangeText={setEmail} />
                    <Input label='Senha' placeholder='Digite a sua senha' value={senha} onChangeText={setSenha} />
                    <Button
                        title="Entrar"
                        noSpacing={true}
                        variant='primary'
                        onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}
