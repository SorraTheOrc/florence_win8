using Client.DataModel;
using WookieService;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace Client
{
    /// <summary>
    /// The main page of the folorence App. This page shows the "tile" associated with each widget in the system.
    /// </summary>
    public sealed partial class MainPage : Page
    {

        WidgetDataSource widgetData = null;

        public MainPage()
        {
            this.InitializeComponent();
            
            widgetData = new WidgetDataSource();
            WidgetGridView.ItemsSource = widgetData.Widgets;
            widgetData.load();
        }

        /// <summary>
        /// Invoked when this page is about to be displayed in a Frame.
        /// </summary>
        /// <param name="e">Event data that describes how this page was reached.  The Parameter
        /// property is typically used to configure the page.</param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
        }

        void WidgetView_WidgetClick(object sender, ItemClickEventArgs e)
        {
            // Navigate to the appropriate destination page, configuring the new page
            // by passing required information as a navigation parameter
            this.Frame.Navigate(typeof(WidgetPage), (Widget)e.ClickedItem);
        }

        void WidgetView_OpenUrl(object sender, NotifyEventArgs e)
        {
            Widget widget = this.widgetData.get(e.Value);
            this.Frame.Navigate(typeof(WidgetPage), widget);
        }
    }
}
