import {HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG} from "@/lib/consts";
import TradingViewWidget from "@/components/TradingViewWidget";

const Home = () => {
    const urlPrefix = "https://s3.tradingview.com/external-embedding/embed-widget-"
    return (
        <div className={"flex min-h-screen home-wrapper"}>
            <section className={"grid w-full gap-8 home-section"}>
                <div className={"md:col-span1 xl:col-span-1"}>
                    <TradingViewWidget
                        title={"Market Overview"}
                        scriptUrl={`${urlPrefix}market-overview.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className={"md-col-span-1 xl:col-span-2"}>
                    <TradingViewWidget
                        title={"Stock Heatmap"}
                        scriptUrl={`${urlPrefix}stock-heatmap.js`}
                        config={HEATMAP_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
            </section>
            <section className={"grid w-full gap-8 home-section"}>
                <div className={"h-full md:col-span-1 xl:col-span-1"}>
                    <TradingViewWidget
                        scriptUrl={`${urlPrefix}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        className="custom-chart"
                        height={600}
                    />
                </div>
                <div className={"h-full md:col-span-1 xl:col-span-2"}>
                    <TradingViewWidget
                        scriptUrl={`${urlPrefix}market-quotes.js`}
                        config={MARKET_DATA_WIDGET_CONFIG}
                        height={600}
                    />
                </div>
            </section>
        </div>
    )
}
export default Home
