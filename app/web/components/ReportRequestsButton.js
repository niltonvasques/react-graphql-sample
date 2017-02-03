/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { RequestsQuery } from '../../constants/Queries';

export default class ReportRequestsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [] 
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }
    if (!newProps.data.reportRequestsClosedInLastMonth) { return; }

    this.setState({
      requests: newProps.data.reportRequestsClosedInLastMonth
    })
  }

  render() {
    return (
        <Button 
        color="dimgray"
        onPress={this.onReport.bind(this)} 
        title="Reports closed from last month (PDF)" accessibilityLabel="Report last month" />
    );
  }

  onReport() {
    var pdfConverter = require('jspdf');
    var doc = new pdfConverter('p','pt','c6');

    doc.setFontSize(12);
    doc.text(20, 50, 'Reports closed from last month');
    var position = 70;
    this.state.requests.forEach((request) => {
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(20, position+=15, `#${request.id} - ${request.title}`);

      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(20, position+=10, `User: ${request.user.name}`);
      doc.text(20, position+=10, `Title: ${request.title}`);
      doc.text(20, position+=10, `Content: ${request.content}`);
      doc.text(20, position+=10, `Created At: ${request.created_at}`);

      if (position > 380) {
        doc.addPage();
        position = 50;
      }
    });
    doc.save("report_tickets_closed_from_last_month.pdf");
  }
}

const styles = StyleSheet.create({ });

const query = gql`
query reportRequestsClosedInLastMonth {
  reportRequestsClosedInLastMonth {
    id,
    title,
    content,
    user { name }
    created_at,
    updated_at
  }
}`;

export const ReportRequestsButtonWithData = graphql(query)(ReportRequestsButton);
