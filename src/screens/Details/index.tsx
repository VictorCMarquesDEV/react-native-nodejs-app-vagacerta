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
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { JobProps } from '../../utils/Types';
import api from '../../services/api';
import { Linking, Platform } from 'react-native';


export default function Details({ route, navigation }) {

    const [id, setId] = useState(route.params.id);
    const [vaga, setVaga] = useState<JobProps>(null);

    const handleGoWhatsApp = () => {
        if (vaga.phone) {
            let msg = "Olá, eu vim do Vaga Certa e tenho interesse na sua vaga de " + vaga.title + ".";
            let phoneWithCountryCode = "55" + vaga.phone;

            let mobile =
                Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
            if (mobile) {
                if (msg) {
                    let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                    Linking.openURL(url)
                        .catch(() => {
                            alert("Instale o WhatsApp no seu dispositivo!");
                        });
                }
            }
        }
    }

    const fetchVaga = async () => {
        try {
            const response = await api.get(`/vagas/${id}`);
            const job = response.data;
            setVaga({
                id: job.id,
                title: job.titulo,
                description: job.descricao,
                date: job.dataCadastro,
                phone: job.telefone,
                status: job.status,
                company: job.empresa
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchVaga();
    }, [id]);

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

            {vaga ? (
                <Container>
                    <ContentContainer>
                        <Title>{vaga.title}</Title>
                        <Description>{vaga.description}</Description>
                    </ContentContainer>

                    {vaga.status == "aberta" ? (
                        <Button
                            title="Entrar em contato"
                            noSpacing={true}
                            variant='primary'
                            onPress={handleGoWhatsApp}
                        />
                    ) : (
                        <Title>Essa vaga já foi encerrada!{'\n'}Não é possível entrar em contato mais...</Title>
                    )}

                </Container>
            ) : (
                <Title>Vaga não foi encontrada!</Title>
            )}

        </Wrapper>
    );
}
