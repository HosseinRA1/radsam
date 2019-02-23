import React, {Component} from 'react';
import {View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

export default class CheckBoxStudyForm extends Component {
    componentWillMount() {
        this.state = {
            selectedItems: []
        };
    }

    items = [{
        id: '1',
        name: 'Exclusive education advice',
    }, {
        id: '2',
        name: 'Participate in academic admission training group webinars',
    }, {
        id: '3',
        name: 'Participate in educational visa group training',
    }, {
        id: '4',
        name: 'Participate in PhD / Post Doctor / Scholarship Fondi',
    }, {
        id: '5',
        name: 'Get a guaranteed education admission',
    }, {
        id: '6',
        name: 'Get a Student Visa',
    }, {
        id: '7',
        name: 'Getting a tourist visa for fellows',
    }, {
        id: '8',
        name: 'Extended study visa',
    }, {
        id: '9',
        name: 'Converting tourist visas to education',
    },
        {
            id : '10',
            name : 'Apply to work spouse'
        },
        {
            id : '11',
            name : 'Official translation of documents'
        },
        {
            id : '12',
            name : 'Turkish tour for biometrics (fingerprinting)'
        },
        {
            id : '13',
            name : 'Visa voucher'
        },
        {
            id : '14',
            name : 'Canadian ticket with the best rates for students'
        },{
            id : '15',
            name : 'Request a hostel'
        },
        {
            id : '16',
            name : 'Student health insurance application'
        },
        {
            id : '17',
            name : 'Applying for health insurance for fellows'
        },
        {
            id : '18',
            name : 'Scholarship Request'
        },
        {
            id : '19',
            name : 'Request for the equivalence of qualifications'
        },
        {
            id : '20',
            name : 'Application for the equivalent of student / spouse employment records'
        },
        {
            id : '21',
            name : 'Applying for IELTS Test Preparation classes'
        },
        {
            id : '22',
            name : 'Welcome and airport transfer'
        },
        {
            id : '23',
            name : 'Apply for work permit after graduation from PGWP'
        },
        {
            id : '24',
            name : 'Opening a bank account in Canada'
        },
        {
            id : '25',
            name : 'Rent / purchase of housing'
        },
        {
            id : '26',
            name : 'Employment and Employment for Students'
        },
        {
            id : '27',
            name : 'Employment and employment for the spouse'
        },
    ];

    onSelectedItemsChange = selectedItems => {
        this.setState({selectedItems});
    };

    render() {
        const {selectedItems} = this.state;
        return (
            <View style = {{width : '90%' , alignSelf: 'center' }}>
                <MultiSelect

                    items={this.items}
                    uniqueKey="id"
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Pick Items"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(text) => console.log(text)}
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor="#FF654D"
                    submitButtonText="Submit"
                />
            </View>

        );
    }
}
