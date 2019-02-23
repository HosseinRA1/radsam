import React, {Component} from 'react';
import {Actions, Drawer, Router, Scene} from 'react-native-router-flux';
import SplashPage from "./src/pages/splash/SplashPage";
import WelcomePage from "./src/pages/welcome/WelcomePage";
import LoginPage from "./src/pages/Auth/LoginPage";
import VerifyWelcomePage from "./src/pages/welcome/VerifyWelcomePage";
import VerifyTemporaryStudyPermitPage from "./src/pages/study/VerifyTemporaryStudyPermitPage";
import VerifyTemporaryVisitorVisaPage from "./src/pages/visitor/VerifyTemporaryVisitorVisaPage";
import UploadAndWaitForContractPage from "./src/pages/visitor/UploadAndWaitForContractPage";
import UploadAndWaitForContractStudyPermitPage from "./src/pages/study/UploadAndWaitForContractStudyPermitPage";
import CompletedPage from "./src/pages/study/CompletedPage";
import RegisterPage from "./src/pages/Auth/RegisterPage";
import MainPage from "./src/pages/main/MainPage";
import VisitorVisaPage from "./src/pages/visitor/VisitorVisaPage";
import RegistrationTemporaryForm from "./src/pages/visitor/RegistrationTemporaryForm";
import CheckListPage from "./src/pages/visitor/CheckListPage";
import UploadContract from "./src/pages/visitor/UploadContract";
import RejectedPage from "./src/pages/visitor/RejectedPage";
import UploadInvoice from "./src/pages/visitor/UploadInvoice";
import SelectLanguagePage from "./src/pages/splash/SelectLanguagePage";
import StudyVisaPage from "./src/pages/study/StudyVisaPage";
import RegistrationTemporaryStudyForm from "./src/pages/study/RegistrationTemporaryStudyForm";
import MessagePage from "./src/pages/main/MessagePage";
import News from "./src/pages/main/News";
import FAQ from "./src/pages/main/FAQ";
import AboutUs from "./src/pages/main/AboutUs";
import SideBar from "./src/components/SideBar";
import VerifyMobile from "./src/pages/Auth/VerifyMobile";
import Weather from "./src/pages/main/Weather";
import SelectForm from "./src/pages/main/SelectForm";


class App extends Component {
    render() {
        return (
            <Router>
                <Scene hideNavBar key="root">
                    <Scene hideNavBar key="auth" initial>
                        <Scene key="welcome" component={WelcomePage}/>
                        <Scene key="login" component={LoginPage}/>
                        <Scene key="verify" component={VerifyMobile}/>
                        <Scene key="register" component={RegisterPage}/>
                        <Scene key="splash" component={SplashPage} initial/>
                        <Scene key="select_language" component={SelectLanguagePage}/>
                    </Scene>
                    <Scene hideNavBar key="home">
                        <Drawer
                            key={'drawer'}
                            contentComponent={SideBar}>
                            <Scene hideNavBar>
                                <Scene key="main" component={MainPage}/>
                                <Scene key="weather" component={Weather}/>
                                <Scene key="news" component={News}/>
                                <Scene key="faq" component={FAQ}/>
                                <Scene key="select_form" component={SelectForm}/>
                                <Scene key="about" component={AboutUs}/>
                                <Scene key="check_list_page" component={CheckListPage}/>
                                <Scene key="payment" component={UploadInvoice}/>
                                <Scene key="upload_contract" component={UploadContract}/>
                                <Scene key="completed" component={CompletedPage}/>
                                <Scene key="rejected" component={RejectedPage}/>
                                <Scene key="upload_and_wait_for_contract_study_permit"
                                       component={UploadAndWaitForContractStudyPermitPage}/>
                                <Scene key="upload_and_wait_for_contract" component={UploadAndWaitForContractPage}/>
                                <Scene key="verify_temporary_visitor_visa" component={VerifyTemporaryVisitorVisaPage}/>
                                <Scene key="verify_temporary_study_permit" component={VerifyTemporaryStudyPermitPage}/>
                                <Scene key="verify_welcome" component={VerifyWelcomePage}/>
                                <Scene key="visitor_visa" component={VisitorVisaPage}/>
                                <Scene key="study_visa" component={StudyVisaPage}/>
                                <Scene key="registration_temporary_form" component={RegistrationTemporaryForm}/>
                                <Scene key="registration_temporary_study_form"
                                       component={RegistrationTemporaryStudyForm}/>
                                <Scene key="message" component={MessagePage}/>
                            </Scene>
                        </Drawer>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default App;