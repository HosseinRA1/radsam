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
        name: 'Evaluation of information and counseling',
    }, {
        id: '2',
        name: 'Participate in Visa and Immigration Group Training Seminars',
    }, {
        id: '3',
        name: 'Visa and Immigration Services',
    }, {
        id: '4',
        name: 'Official translation of documents',
    }, {
        id: '5',
        name: 'Turkish tour for fingerprinting (biometric)',
    }, {
        id: '6',
        name: 'Visa voucher',
    }, {
        id: '7',
        name: 'Canadian ticket with the best rates',
    }, {
        id: '8',
        name: 'Welcoming airport and transfer',
    }, {
        id: '9',
        name: 'Converting tourist visas to education',
    },
        {
            id: '10',
            name: 'Coordination of temporary accommodation'
        },
        {
            id: '11',
            name: 'Business Consulting for Investment and Entrepreneurship in Canada'
        },
        {
            id: '12',
            name: 'Buy and launch business'
        },
        {
            id: '13',
            name: 'Financial and tax consulting'
        },
        {
            id: '14',
            name: 'Legal Consultancy'
        }, {
            id: '15',
            name: 'Employment and Employment (only if you have legal employment permit in Canada)'
        },
        {
            id: '16',
            name: 'Driving licence'
        },
        {
            id: '17',
            name: 'opening a bank account'
        },
        {
            id: '18',
            name: 'Insurance'
        },
        {
            id: '19',
            name: 'Car Rental'
        },
        {
            id: '20',
            name: 'car purchase'
        },
        {
            id: '21',
            name: 'car insurance'
        },
        {
            id: '22',
            name: 'Buy a mobile phone line and the Internet'
        },
        {
            id: '23',
            name: 'Ready to take an IELTS exam'
        },
        {
            id: '24',
            name: 'Equalization of qualifications'
        },
        {
            id: '25',
            name: 'Equalization of job records'
        },
        {
            id: '26',
            name: 'Visa Advice'
        },
        {
            id: '27',
            name: 'Registering children at school'
        },
        {
            id: '28',
            name: 'Extended permanent residence card'
        },
        {
            id: '29',
            name: 'extending passport'
        },
    ];

    onSelectedItemsChange = selectedItems => {
        this.setState({selectedItems});
    };

    render() {
        const {selectedItems} = this.state;
        return (
            <View style={{width: '90%', alignSelf: 'center'}}>
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
